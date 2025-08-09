"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SurnameFormProps {
  onSubmit: (surname: string) => Promise<void>;
}

export default function SurnameForm({ onSubmit }: SurnameFormProps) {
  const [surname, setSurname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(surname);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <Label htmlFor="surname">Please enter your surname *</Label>
        <Input
          id="surname"
          type="text"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="e.g., Smith"
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Looking up..." : "Continue"}
      </Button>
    </form>
  );
}
