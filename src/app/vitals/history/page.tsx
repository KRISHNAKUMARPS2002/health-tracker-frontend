"use client";

import { useEffect, useState } from "react";
import { getVitals } from "@/app/lib/api/vitals";
import camelcaseKeys from "camelcase-keys";
import { useRouter } from "next/navigation";
import { VitalsLog } from "@/app/lib/types/vitals";
import Card from "@/app/components/ui/Card";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import {
  Calendar,
  Gauge,
  HeartPulse,
  Thermometer,
  Droplet,
  Weight,
  Activity,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function VitalsHistoryPage() {
  const [vitalsList, setVitalsList] = useState<VitalsLog[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const vitals = await getVitals();
        const formatted = vitals.map((v: any) =>
          camelcaseKeys(v, { deep: true })
        ) as VitalsLog[];

        setVitalsList(formatted);
      } catch (err) {
        console.error("Failed to fetch vitals history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, []);

  const formatDate = (date?: string) =>
    date
      ? new Date(date).toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "Unknown";

  type VitalStatus = "Normal" | "Warning" | "Critical";

  const statusIconMap: Record<VitalStatus, React.ReactElement> = {
    Normal: <CheckCircle className="text-emerald-600 w-3 h-3 sm:w-4 sm:h-4" />,
    Warning: <AlertCircle className="text-yellow-600 w-3 h-3 sm:w-4 sm:h-4" />,
    Critical: <AlertTriangle className="text-red-600 w-3 h-3 sm:w-4 sm:h-4" />,
  };

  return (
    <div className="p-3">
      <Card gradient className="p-4 space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-sm text-gray-900 hover:text-indigo-600 transition cursor-pointer"
          >
            <IoArrowBackCircleSharp className="text-xl sm:text-2xl" />
            <span className="text-xl sm:text-2xl">Back</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-gray-900">
            Vitals History
          </h2>
        </div>

        {loading ? (
          <Card className="text-center py-10">
            <p className="text-gray-500">Loading history...</p>
          </Card>
        ) : vitalsList.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-gray-500">No history yet.</p>
          </Card>
        ) : (
          vitalsList.map((vital, idx) => {
            const status: VitalStatus = (vital.status ??
              "Normal") as VitalStatus;

            return (
              <Card
                key={idx}
                className="p-4 rounded-xl shadow-sm bg-white border border-blue-100"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs sm:text-sm text-gray-500">
                    {formatDate(vital.measuredAt)}
                  </p>

                  <div className="flex items-center gap-1 text-xs sm:text-sm font-medium">
                    {statusIconMap[status]}
                    <span
                      className={
                        {
                          Normal: "text-emerald-600",
                          Warning: "text-yellow-600",
                          Critical: "text-red-600",
                        }[status]
                      }
                    >
                      {status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <VitalMini
                    icon={<Gauge className="w-4 h-4 text-gray-500" />}
                    label="BP"
                    value={vital.bloodPressure}
                  />
                  <VitalMini
                    icon={<HeartPulse className="w-4 h-4 text-gray-500" />}
                    label="Heart"
                    value={vital.heartRate + " bpm"}
                  />
                  <VitalMini
                    icon={<Weight className="w-4 h-4 text-gray-500" />}
                    label="Weight"
                    value={vital.weight + " kg"}
                  />
                  <VitalMini
                    icon={<Activity className="w-4 h-4 text-gray-500" />}
                    label="BMI"
                    value={vital.bmi + " kg/m²"}
                  />
                  <VitalMini
                    icon={<Thermometer className="w-4 h-4 text-gray-500" />}
                    label="Temp"
                    value={vital.temperature + "°C"}
                  />
                  <VitalMini
                    icon={<Droplet className="w-4 h-4 text-gray-500" />}
                    label="SpO₂"
                    value={vital.spo2 + " %"}
                  />
                  <VitalMini
                    icon={<AlertCircle className="w-4 h-4 text-gray-500" />}
                    label="Reasons"
                    value={
                      Array.isArray(vital.reasons) &&
                      vital.reasons.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {vital.reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-sm text-gray-500">
                          No reasons provided
                        </span>
                      )
                    }
                  />
                </div>
              </Card>
            );
          })
        )}
      </Card>
    </div>
  );
}

const VitalMini = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | number | React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
    <div className="flex justify-between items-center mb-1 text-xs text-gray-600">
      <span className="flex items-center gap-1">
        {icon}
        {label}
      </span>
    </div>
    <p className="text-sm font-medium text-gray-800">{value || "--"}</p>
  </div>
);
