import type { Metadata } from "next";
import { GriPrototypeApp } from "@/components/content/gri-prototype-app";

export const metadata: Metadata = {
  title: "GRI, Gestão de Relacionamento Institucional — Protótipo",
};

export default function PrototipoGriPage() {
  return <GriPrototypeApp />;
}
