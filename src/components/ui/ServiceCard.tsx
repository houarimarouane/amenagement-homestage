interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white p-8 border border-transparent hover:border-[#C9A96E]/30 transition-all duration-300 group shadow-sm">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="font-serif text-xl text-[#1A1A1A] mb-3 group-hover:text-[#C9A96E] transition-colors">
        {title}
      </h3>
      <p className="text-[#6B6B6B] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
