import { createFileRoute } from "@tanstack/react-router";
import Presentation from "@/components/presentation/Presentation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Virtual LAN (VLAN) — Keynote" },
      { name: "description", content: "An interactive keynote-style presentation on Virtual LANs, network segmentation, and 802.1Q tagging." },
      { property: "og:title", content: "Virtual LAN (VLAN) — Keynote" },
      { property: "og:description", content: "An interactive keynote-style presentation on Virtual LANs, network segmentation, and 802.1Q tagging." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Presentation />,
});
