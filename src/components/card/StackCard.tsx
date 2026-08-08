import {
  Globe,
  Server,
  Smartphone,
  Database,
  Cloud,
  Code,
  Zap,
  ChevronRight
} from "lucide-react";

interface StackCardProps {
  type: "Backend" | "Frontend" | "Mobile" | "Database" | "Other" |"DevOps";
  title: string;
  list: string[];
  icon?: React.ReactNode;
}

const StackCard = ({ type, title, list, icon }: StackCardProps) => {
  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case "Frontend":
        return <Globe className="w-5 h-5" />;
      case "Backend":
        return <Server className="w-5 h-5" />;
      case "Mobile":
        return <Smartphone className="w-5 h-5" />;
      case "Database":
        return <Database className="w-5 h-5" />;
      case "Other":
        return <Zap className="w-5 h-5" />;
      case "DevOps":
        return <Cloud className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "Frontend":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Backend":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Mobile":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      case "Database":
        return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Other":
        return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default:
        return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <div className="group relative w-full max-w-[200px] rounded-xl bg-surface-container/50 backdrop-blur-sm border border-outline-variant/10 p-5 transition-all duration-300 hover:bg-surface-container hover:border-outline-variant/30 hover:-translate-y-2 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2.5 rounded-lg ${getTypeColor()} border transition-all duration-300 group-hover:scale-110`}>
          {getIcon()}
        </div>
        <div>
          <h3 className="font-heading text-sm font-semibold text-on-surface">
            {title}
          </h3>
          <span className={`font-mono text-[8px] uppercase tracking-widest ${getTypeColor()}`}>
            {type}
          </span>
        </div>
      </div>

      {/* Tech List */}
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-on-surface-variant text-[12px] font-body transition-all duration-300 group-hover:text-on-surface"
          >
            <ChevronRight className={`w-3 h-3 ${getTypeColor()} transition-transform duration-300 group-hover:translate-x-1`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-outline-variant/5">
        <span className="font-mono text-[8px] text-on-surface-variant/30 uppercase tracking-widest">
          {list.length} technologies
        </span>
      </div>

      {/* Hover Glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-${type.toLowerCase()}-500/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10`} />
    </div>
  );
};

export default StackCard;