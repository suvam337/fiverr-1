import React from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, Lock, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SafetyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyNoticeModal: React.FC<SafetyNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 p-6 border-b border-rose-100 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-600">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Account Safety: Why You Must Never Share Fiverr Access
                </h2>
                <p className="text-sm text-slate-600 mt-0.5">
                  Protecting your freelance reputation, revenue, and security
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
            {/* Direct Answer */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">
                  Can an AI log into your Fiverr account to create a gig for you?
                </p>
                <p className="text-amber-800 mt-1">
                  <strong>No.</strong> You should <strong>never give your Fiverr login credentials, passwords, or 2FA codes</strong> to anyone—including AI agents or freelance service providers.
                </p>
              </div>
            </div>

            {/* 3 Core Reasons */}
            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-base">3 Critical Reasons to Keep Access Private:</h3>
              
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <Lock className="w-4 h-4 text-emerald-600" />
                  1. Financial & Personal Data Risk
                </div>
                <p className="text-slate-600 text-xs pl-6">
                  Your Fiverr account is tied to your bank account, PayPal, earnings withdrawal methods, and tax verification forms. Sharing login details compromises your sensitive financial data.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  2. Fiverr Terms of Service (TOS) Violation
                </div>
                <p className="text-slate-600 text-xs pl-6">
                  Fiverr's terms explicitly forbid account sharing and automated third-party browser session takeovers. Violating this triggers automated security flags and can result in <strong>instant account suspension or permanent banning</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  3. Autonomous AI Limits
                </div>
                <p className="text-slate-600 text-xs pl-6">
                  AI coding agents run in isolated sandboxes and do not have web-browser bot capability to interactively click and bypass Fiverr's Cloudflare protections and CAPTCHAs.
                </p>
              </div>
            </div>

            {/* The Safe Solution */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-base">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                The 100% Safe, Approved Solution:
              </div>
              <p className="text-emerald-800">
                You do not need to give anyone access! This app generates the <strong>entire Perfect Gig Kit</strong> (SEO Title, 5 tags, 3-tier pricing table, sales description, FAQs, buyer requirements, and thumbnail brief).
              </p>
              <p className="text-emerald-800 font-medium">
                You simply click <span className="underline decoration-emerald-500 font-bold">Copy</span> on each section and paste them directly into Fiverr's standard gig creation form in 2 minutes. Your credentials stay 100% private and safe!
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Got it, Let's Build My Gig Safely</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
