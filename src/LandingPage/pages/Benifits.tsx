import { benefits } from "../data/data";
import { BookOpen, Heart, CloudLightning } from "lucide-react";

const icons = [BookOpen, Heart, CloudLightning];

export default function Benefits() {
  return (
    <section id="benefits" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            How Notex transforms your workflow
          </h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div key={index} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}