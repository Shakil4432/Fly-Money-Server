import { Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 bg-[#7c3f00] py-3 px-4 text-gray-300 text-sm md:text-base font-medium text-center md:text-left">
      <div className="flex items-center justify-center gap-2">
        📞 To order any of our products, please call or WhatsApp us:
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-300">
        <Phone className="w-4 h-4" />
        +880XXXXXXXX
      </div>
      <div className="flex items-center justify-center gap-2 text-gray-300">
        <Phone className="w-4 h-4" />
        Hotline: 096XXXXXXXX
      </div>
    </div>
  );
};

export default Contact;
