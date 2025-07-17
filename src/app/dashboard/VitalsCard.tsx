import React, { useState, useEffect } from "react";
import camelcaseKeys from "camelcase-keys";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useRouter } from "next/navigation";
import {
  Heart,
  Activity,
  Thermometer,
  HeartPulse,
  Droplet,
  Weight,
  Ruler,
  Gauge,
  Apple,
  TrendingUp,
  Plus,
  Eye,
  Calendar,
  Target,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { getVitals } from "../lib/api/vitals";
import { VitalsLog } from "../lib/types/vitals";

type VitalStatus = "Normal" | "Warning" | "Critical";

const VitalsCard = () => {
  const [vitals, setVitals] = useState<VitalsLog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const allVitals = await getVitals();
        if (allVitals.length > 0) {
          const raw = JSON.parse(JSON.stringify(allVitals[0]));
          const latest = camelcaseKeys(raw, {
            deep: true,
          }) as unknown as VitalsLog;
          console.log("Latest Vitals (camelCase):", latest);
          setVitals(latest as VitalsLog);
        }
      } catch (error) {
        console.error("Error fetching vitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, []);

  if (loading) {
    return (
      <Card className="text-center py-8">
        <p className="text-gray-500">Loading vitals...</p>
      </Card>
    );
  }

  const statusIconMap: Record<VitalStatus, React.ReactElement> = {
    Normal: <CheckCircle className="w-3 h-3 fill-emerald-500" />,
    Warning: <AlertTriangle className="w-3 h-3 text-yellow-500" />,
    Critical: <AlertTriangle className="w-3 h-3 text-red-500" />,
  };

  const statusColorMap: Record<VitalStatus, string> = {
    Normal: "text-emerald-600",
    Warning: "text-yellow-600",
    Critical: "text-red-600",
  };

  if (!vitals) {
    return (
      <Card className="text-center py-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Vitals Recorded
        </h3>
        <p className="text-gray-600 mb-4">
          Start tracking your health metrics today
        </p>

        <div className="flex justify-center mt-5">
          <Button
            variant="secondary"
            size="md"
            className="flex items-center gap-1 sm:gap-2"
            onClick={() => router.push("/vitals/add")}
          >
            <Plus className="w-4 h-4" />
            Add Your First Vitals
          </Button>
        </div>
      </Card>
    );
  }

  const status: VitalStatus = (vitals.status as VitalStatus) || "Normal";

  return (
    <Card gradient={true} className="max-w-[700px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-600" />
          Latest Vitals
        </h3>
        <div className="flex items-center gap-1">
          {statusIconMap[status]}
          <span className={statusColorMap[status]}>{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <VitalItem
          label="Blood Pressure"
          value={vitals.bloodPressure}
          unit="mmHg"
          icon={<Gauge className="w-5 h-5 text-black" />}
        />
        <VitalItem
          label="Weight"
          value={vitals.weight}
          unit="kg"
          icon={<Weight className="w-5 h-5 text-black" />}
        />
        <VitalItem
          label="Heart Rate"
          value={vitals.heartRate}
          unit="bpm"
          icon={<HeartPulse className="w-5 h-5 text-black" />}
        />
        <VitalItem
          label="BMI"
          value={vitals.bmi}
          unit="kg/m²"
          icon={<Activity className="w-5 h-5 text-black" />}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => router.push("/vitals/details")}
        >
          <Eye className="w-4 h-4" />
          View Details
        </Button>

        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => router.push("/vitals/history")}
        >
          <Calendar className="w-4 h-4" />
          View History
        </Button>
      </div>
    </Card>
  );
};

// Reusable component
const VitalItem = ({
  label,
  value,
  unit,
  icon,
  color = "text-gray-900",
}: {
  label: string;
  value?: string | number;
  unit: string;
  icon?: React.ReactNode;
  color?: string;
}) => (
  <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-600">{label}</p>
      {icon && <span className="text-gray-400">{icon}</span>}
    </div>
    <p className={`text-xl font-bold ${color}`}>
      {value !== undefined && value !== null ? value : "--"}
    </p>
    <p className="text-xs text-gray-500">{unit}</p>
  </div>
);

export default VitalsCard;
