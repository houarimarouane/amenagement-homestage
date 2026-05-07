interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 border border-[#E5E0DC] hover:border-[#7A0D0A]/40 transition-all duration-300 group shadow-sm">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="font-serif text-xl text-[#1A1714] mb-3 group-hover:text-[#7A0D0A] transition-colors">
        {title}
      </h3>
      <p className="text-[#6B6560] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
