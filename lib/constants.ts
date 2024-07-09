import { IconType } from "react-icons/lib";
import { CiCalendar } from "react-icons/ci";
import { IoStatsChartSharp } from "react-icons/io5";
import { LuMonitorSmartphone } from "react-icons/lu";

export const cartaoSite: {
  icon: IconType;
  title: string;
  description: string;
}[] = [
  {
    icon: CiCalendar,
    title: "Gerencie Treinos e Dietas",
    description:
      "Organize seus treinos e dietas de maneira simples e eficaz. Personalize seu plano de saúde e fitness conforme suas necessidades.",
  },
  {
    icon: IoStatsChartSharp,
    title: "Acompanhe seu Progresso",
    description:
      "Visualize seu progresso ao longo do tempo. Registre suas conquistas e mantenha-se motivado para alcançar seus objetivos.",
  },
  {
    icon: LuMonitorSmartphone,
    title: "Recursos Avançados",
    description:
      "Acesse uma biblioteca completa de exercícios, vídeos e dicas de especialistas. Explore recursos integrados para maximizar seus resultados.",
  },
] as const;
