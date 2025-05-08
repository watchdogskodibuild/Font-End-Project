import React from "react";
import { FileText, PenLine, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div dir="rtl" className="p-6 space-y-12 bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f1e9df] to-[#e4ddd4] p-10 rounded-xl shadow-sm text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          ברוכים הבאים ל-Easy2Write
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          פלטפורמה לסטודנטים המספקת תבניות וכלים לכתיבה אקדמית, קורות חיים ועוד
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/templates" className="bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800">
            עיון בתבניות
          </a>
          <a href="/editor" className="border border-gray-400 px-6 py-3 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <PenLine size={18} />
            התחלת עבודה חדשה
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="תבניות מקצועיות"
          icon={<FileText />}
          description="מגוון תבניות לעבודות אקדמיות, קורות ומסמכים נוספים"
        />
        <FeatureCard
          title="סביבת עריכה נוחה"
          icon={<PenLine />}
          description="עורך טקסט חכם עם כלים מתקדמים לעיצוב ועריכת תוכן"
        />
        <FeatureCard
          title="כלים לסטודנטים"
          icon={<GraduationCap />}
          description="פתרונות ייעודיים לצרכי כתיבה אקדמית וציטוט מקורות"
        />
      </section>

      {/* Popular Templates */}
      <section>
        <h2 className="text-xl font-semibold mb-6">תבניות פופולריות</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <TemplateCard title="מכתב מקצועי" />
          <TemplateCard title="רפרט אקדמי" />
          <TemplateCard title="עבודה סמינריונית" />
          <TemplateCard title="קורות חיים" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, icon, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
      <div className="text-purple-700 mb-3 flex justify-center">{icon}</div>
      <h3 className="text-md font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}

function TemplateCard({ title }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm text-center space-y-2">
      <FileText className="mx-auto text-gray-500" />
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <a href="/editor" className="text-sm text-purple-700 hover:underline">
        התחל כתיבה
      </a>
    </div>
  );
}

