"use client";

import React, { useEffect, useState } from "react";
import { getVitals } from "@/app/lib/api/vitals";
import camelcaseKeys from "camelcase-keys";
import { VitalsLog } from "@/app/lib/types/vitals";
import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
import {
  Calendar,
  Eye,
  Thermometer,
  HeartPulse,
  Droplet,
  Weight,
  Ruler,
  Activity,
  Gauge,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

const VitalsDetailsPage = () => {
  const [vitals, setVitals] = useState<VitalsLog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const allVitals = await getVitals();
        if (allVitals.length > 0) {
          const raw = JSON.parse(JSON.stringify(allVitals[0]));
          const latest = camelcaseKeys(raw, { deep: true }) as VitalsLog;
          setVitals(latest);
        }
      } catch (error) {
        console.error("Error fetching vitals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, []);

  if (loading || !vitals) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-center">Loading latest vitals...</p>
      </main>
    );
  }

  const measuredDate = vitals.measuredAt
    ? new Date(vitals.measuredAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short", // e.g., "Jul"
        day: "numeric", // e.g., "16"
      })
    : "Unknown";

  const measuredTime = vitals.measuredAt
    ? new Date(vitals.measuredAt).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown";

  const statusDetails = {
    Normal: {
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    Warning: {
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    Critical: {
      icon: AlertTriangle,
      color: "text-red-600",
    },
  } as const;

  type StatusKey = keyof typeof statusDetails;

  const safeStatus = (vitals.status ?? "Normal") as StatusKey;

  const { icon: StatusIcon, color: statusColor } = statusDetails[safeStatus];

  const getColorByVital = (label: string, value: number | undefined) => {
    if (label === "SpO₂" && value && value < 95) return "text-red-600";
    if (label === "Temperature" && value && value > 100.4)
      return "text-orange-600";
    if (label === "Heart Rate" && value && (value < 60 || value > 100))
      return "text-yellow-600";
    return "text-gray-900";
  };

  return (
    <main className="min-h-screen bg-blue-50 px-2 py-3 sm:px-4 sm:py-6">
      <Card gradient className="p-3 sm:p-6 rounded-2xl max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-800">
            Your Latest Vitals Report
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            A quick summary of your recent health check.
          </p>
        </div>

        {/* Status */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2">
            <StatusIcon className={`w-5 h-5 ${statusColor}`} />
            <p className={`font-medium ${statusColor}`}>
              Status: {vitals.status}
            </p>
          </div>
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 sm:mb-6">
          <VitalItem
            label="Blood Pressure"
            value={vitals.bloodPressure}
            unit="mmHg"
            icon={<Gauge className="w-5 h-5 text-black" />}
          />
          <VitalItem
            label="Heart Rate"
            value={vitals.heartRate}
            unit="bpm"
            icon={<HeartPulse className="w-5 h-5 text-black" />}
            color={getColorByVital("Heart Rate", vitals.heartRate)}
          />
          <VitalItem
            label="SpO₂"
            value={vitals.spo2}
            unit="%"
            icon={<Droplet className="w-5 h-5 text-black" />}
            color={getColorByVital("SpO₂", vitals.spo2)}
          />
          <VitalItem
            label="BMI"
            value={vitals.bmi?.toFixed(2)}
            unit="kg/m²"
            icon={<Activity className="w-5 h-5 text-black" />}
          />
          <VitalItem
            label="Sugar Level"
            value={vitals.sugarLevel}
            unit="mg/dL"
            icon={<Droplet className="w-5 h-5 text-black" />}
          />
          <VitalItem
            label="Temperature"
            value={vitals.temperature}
            unit="°F"
            icon={<Thermometer className="w-5 h-5 text-black" />}
          />
          <VitalItem
            label="Weight"
            value={vitals.weight}
            unit="kg"
            icon={<Weight className="w-5 h-5 text-black" />}
          />
          <VitalItem
            label="Height"
            value={vitals.height}
            unit="cm"
            icon={<Ruler className="w-5 h-5 text-black" />}
          />
        </div>
        {/* Section: Vitals Details */}
        <div className="mt-8 bg-white rounded-xl p-3 sm:p-4 border border-indigo-200">
          <h3 className="text-md text-center font-semibold text-indigo-700 mb-3">
            Vitals Details
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Measured At</span>
              <span>{measuredDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Measured At</span>
              <span>{measuredTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Source</span>
              <span>{vitals.source || "Manual Entry"}</span>
            </div>
            {vitals.notes && (
              <div className="flex justify-between">
                <span className="font-medium">Notes</span>
                <span className="max-w-[60%] text-right text-gray-800">
                  {vitals.notes}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Reasons for Status */}
        {Array.isArray(vitals.reasons) && vitals.reasons.length > 0 && (
          <div className="mt-8 bg-white rounded-xl p-3 sm:p-4 border border-indigo-200">
            <h4 className="text-md font-medium text-indigo-700 mb-2">
              Reason for Status
            </h4>
            <ul className="text-sm text-gray-700 list-disc list-inside">
              {vitals.reasons.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Section: Understanding Vitals */}
        <div className="mt-8 bg-white rounded-xl p-3 sm:p-4 border border-indigo-200">
          <h3 className="text-md font-semibold text-indigo-700 mb-2">
            Understanding Your Vitals
          </h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>
              <strong>SpO₂</strong>: Measures blood oxygen. Normal is 95%–100%.
            </li>
            <li>
              <strong>BMI</strong>: Assesses body fat using height & weight.
            </li>
            <li>
              <strong>Blood Pressure</strong>: High BP can increase heart risk.
            </li>
            <li>
              <strong>Heart Rate</strong>: 60–100 bpm is considered normal.
            </li>
            <li>
              <strong>Temperature</strong>: Above 100.4°F may indicate fever.
            </li>
            <li>
              <strong>Sugar Level</strong>: {">"} 99 mg/dL could signal
              prediabetes.
            </li>
          </ul>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-4 sm:mt-8">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </main>
  );
};

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

export default VitalsDetailsPage;
