"use client";

import { useState } from "react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Select from "@/app/components/ui/Select";
import { addVitals } from "@/app/lib/api/vitals";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function AddVitalsPage() {
  const [form, setForm] = useState({
    bloodPressure: "",
    heartRate: "",
    weight: "",
    sugarLevel: "",
    temperature: "",
    spo2: "",
    notes: "",
    measuredAt: "",
    source: "manual",
  });

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addVitals({
        bloodPressure: form.bloodPressure,
        heartRate: form.heartRate ? parseFloat(form.heartRate) : undefined,
        sugarLevel: form.sugarLevel ? parseFloat(form.sugarLevel) : undefined,
        weight: form.weight ? parseFloat(form.weight) : undefined,
        temperature: form.temperature
          ? parseFloat(form.temperature)
          : undefined,
        spo2: form.spo2 ? parseFloat(form.spo2) : undefined,
        notes: form.notes,
        measuredAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
        source: form.source,
      });
      router.push("/vitals/details");
    } catch (err) {
      console.error("Failed to add vitals", err);
    }
  };

  return (
    <section className="p-4 max-w-xl mx-auto">
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Plus className="text-blue-600" />
          Add New Vitals
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Blood Pressure (e.g. 120/80)"
            value={form.bloodPressure}
            onChange={(e) =>
              setForm({ ...form, bloodPressure: e.target.value })
            }
          />
          <Input
            type="number"
            placeholder="Heart Rate (bpm)"
            value={form.heartRate}
            onChange={(e) => setForm({ ...form, heartRate: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Sugar Level (mg/dL)"
            value={form.sugarLevel}
            onChange={(e) => setForm({ ...form, sugarLevel: e.target.value })}
          />

          <Input
            type="number"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Temperature (°C)"
            value={form.temperature}
            onChange={(e) => setForm({ ...form, temperature: e.target.value })}
          />

          <Input
            type="number"
            placeholder="SpO2 (%)"
            value={form.spo2}
            onChange={(e) => setForm({ ...form, spo2: e.target.value })}
          />
          <Input
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <Select
            label="Source"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
            options={[
              { label: "manual", value: "Manual" },
              { label: "device", value: "Device" },
            ]}
          />

          <Button type="submit" className="w-full">
            Save Vitals
          </Button>
        </form>
      </Card>
    </section>
  );
}
