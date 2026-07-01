
import React from "react";

const Showcase: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

          {/* SOL TARAF – YAZI */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900">
              Fikirden Gerçeğe
            </h2>

            <p className="text-slate-600 mb-6 text-lg">
              Stratejik planlamadan kusursuz uygulamaya kadar, vizyonunuzu somut,
              etkili ve başarılı projelere dönüştürüyoruz. Sürecin her adımında
              sizinle birlikte çalışarak beklentilerinizi aşan sonuçlar elde ediyoruz.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-700">
                  Detaylı analiz ve mekana özel tasarım.
                </span>
              </li>

              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-700">
                  Profesyonel proje yönetimi ve şeffaf raporlama.
                </span>
              </li>

              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-indigo-500 mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-700">
                  Anahtar teslim projeler ve satış sonrası destek.
                </span>
              </li>
            </ul>
          </div>

          {/* SAĞ TARAF – RESİM */}
          <div className="order-1 md:order-2 flex justify-center w-full">
            <img
              src="/sw1.jpg"
              alt="Modern İç Mekan Projesi"
              className="rounded-xl shadow-lg shadow-gray-900/10 transform transition-transform duration-500 hover:scale-105 w-full max-w-[550px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
