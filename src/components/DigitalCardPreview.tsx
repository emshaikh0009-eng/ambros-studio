import { useState } from 'react';
import { motion } from 'motion/react';
import { Wifi, QrCode, Download, Phone, Mail, Globe, Sparkles, Check } from 'lucide-react';
import { BRAND } from '../data/agencyData';

export default function DigitalCardPreview() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasTappedNFC, setHasTappedNFC] = useState(false);
  const [savedContact, setSavedContact] = useState(false);

  const simulateNFCTap = () => {
    setHasTappedNFC(true);
    setTimeout(() => {
      setHasTappedNFC(false);
    }, 2500);
  };

  const handleDownloadVCard = () => {
    setSavedContact(true);
    // Generate simple vCard string
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Shaikh;Anas;;;\nFN:Anas Shaikh\nORG:AmbrosStudio\nTITLE:Founder & CEO\nTEL;TYPE=CELL:${BRAND.phone}\nEMAIL:${BRAND.email}\nURL:https://ambros.studio\nNOTE:${BRAND.tagline}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Anas_Shaikh_AmbrosStudio.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setSavedContact(false), 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 p-8 md:p-12 rounded-2xl glass-card border border-[#4a4a4a]/60">
      {/* 3D Flippable Card Stage */}
      <div className="w-full max-w-[380px] perspective-1000 flex flex-col items-center">
        <div
          className="relative w-[340px] h-[200px] cursor-pointer transition-transform duration-700 select-none group"
          style={{ transformStyle: 'preserve-3d' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of Card */}
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 rounded-2xl p-6 bg-radial from-[#1e232a] via-[#101216] to-[#0a0a0a] border border-[#6d8196]/50 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex flex-col justify-between backface-hidden ${
              hasTappedNFC ? 'ring-2 ring-[#FFFFE3] shadow-[0_0_35px_rgba(255,255,227,0.5)]' : ''
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Top row: Brand & NFC symbol */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-serif-luxury text-xl text-[#FFFFE3] tracking-wider">
                  AMBROS
                </span>
                <span className="h-[1px] w-12 bg-[#6d8196]" />
              </div>
              <div className="flex items-center gap-1.5 text-[#6d8196]">
                <Wifi className="w-5 h-5 rotate-90" />
                <span className="font-tech text-[9px] uppercase tracking-widest text-[#cbcbcb]/60">
                  NFC SMART
                </span>
              </div>
            </div>

            {/* Middle: Laser texture shimmer */}
            <div className="flex items-center justify-between text-xs font-tech text-[#cbcbcb]/70">
              <span>EXECUTIVE SUITE</span>
              <span className="text-[#FFFFE3] text-[10px]">BLACK MATTE METAL</span>
            </div>

            {/* Bottom row: Cardholder Name */}
            <div className="flex items-end justify-between">
              <div>
                <h4 className="font-tech text-sm font-semibold text-[#FFFFE3] tracking-wide">
                  ANAS SHAIKH
                </h4>
                <p className="font-sans text-[11px] text-[#6d8196]">Founder & CEO</p>
              </div>
              <div className="font-tech text-[10px] text-[#cbcbcb]/40 tracking-widest uppercase">
                TAP OR FLIP
              </div>
            </div>
          </motion.div>

          {/* Back of Card */}
          <motion.div
            animate={{ rotateY: isFlipped ? 0 : -180 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 rounded-2xl p-6 bg-radial from-[#181a1d] to-[#0a0a0a] border border-[#6d8196]/40 shadow-[0_15px_35px_rgba(0,0,0,0.8)] flex items-center justify-between backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="font-tech text-[10px] uppercase tracking-widest text-[#6d8196]">
                  Instant Connect
                </span>
                <div className="font-serif-luxury text-lg text-[#FFFFE3] mt-1">
                  AmbrosStudio
                </div>
                <div className="font-sans text-xs text-[#cbcbcb]/70 mt-1">
                  {BRAND.phone}
                </div>
              </div>

              <div className="font-tech text-[10px] text-[#cbcbcb]/50">
                Click to flip back
              </div>
            </div>

            {/* QR Code Graphic Placeholder */}
            <div className="w-24 h-24 rounded-lg bg-white p-2 flex items-center justify-center shadow-md">
              <QrCode className="w-20 h-20 text-black" />
            </div>
          </motion.div>
        </div>

        {/* Interactive Controls below Card */}
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={simulateNFCTap}
            className="px-4 py-2 rounded-full border border-[#4a4a4a] hover:border-[#6d8196] bg-[#181a1d] text-[#cbcbcb] hover:text-[#FFFFE3] font-tech text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
          >
            <Wifi className="w-3.5 h-3.5 text-[#6d8196]" />
            <span>{hasTappedNFC ? 'Phone Detected!' : 'Simulate NFC Tap'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadVCard}
            className="px-4 py-2 rounded-full border border-[#6d8196] bg-[#6d8196]/20 hover:bg-[#6d8196]/30 text-[#FFFFE3] font-tech text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
          >
            {savedContact ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#FFFFE3]" />
                <span>Contact Saved!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Save Contact</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Narrative & Specification */}
      <div className="flex-1 space-y-4 text-left">
        <div className="inline-flex items-center gap-2 font-tech text-xs uppercase tracking-widest text-[#6d8196]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive NFC Hardware Preview</span>
        </div>
        <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#FFFFE3]">
          Never Buy Paper Business Cards Again.
        </h3>
        <p className="font-sans text-sm text-[#cbcbcb] leading-relaxed">
          Crafted from aerospace-grade matte black metal or recycled polycarbonate, every Ambros smart card is embedded with a high-bandwidth NFC antenna and dynamic QR backup. One tap transmits your complete contact identity, booking link, portfolio, and social channels directly into any smartphone address book.
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 rounded-lg bg-[#181a1d]/60 border border-[#4a4a4a]/40">
            <span className="font-tech text-xs text-[#6d8196] block">Cross-Platform</span>
            <span className="font-sans text-xs text-[#cbcbcb]">iOS & Android Native (No app required)</span>
          </div>
          <div className="p-3 rounded-lg bg-[#181a1d]/60 border border-[#4a4a4a]/40">
            <span className="font-tech text-xs text-[#6d8196] block">Real-Time Sync</span>
            <span className="font-sans text-xs text-[#cbcbcb]">Update phone or links anytime from cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
}
