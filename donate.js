(() => {
  "use strict";
  let lang = "en";
  try {
    lang = localStorage.getItem("kanakpur-language") || "en";
  } catch {}
  if (!["en", "bn"].includes(lang)) lang = "en";
  const config = window.SITE_DATA?.donations || {},
    upi = String(config.upiId || "").trim(),
    recipient = String(config.recipientName || "").trim();
  const ready =
    config.enabled === true &&
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(upi) &&
    recipient.length > 0;
  const el = (id) => document.getElementById(id),
    say = (en, bn) => (lang === "bn" ? bn : en);
  let paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function motion() {
    document.body.classList.toggle("paused", paused);
    el("motion").setAttribute("aria-pressed", String(paused));
    el("motion").textContent = say(
      paused ? "▷ Play effects" : "Ⅱ Pause effects",
      paused ? "▷ অ্যানিমেশন চালু" : "Ⅱ অ্যানিমেশন বন্ধ",
    );
  }
  function translate() {
    document.documentElement.lang = lang;
    document
      .querySelectorAll("[data-en]")
      .forEach((n) => (n.innerHTML = n.dataset[lang]));
    el("language").textContent = lang === "en" ? "EN / বাংলা" : "বাংলা / EN";
    el("language").setAttribute(
      "aria-label",
      say("Switch to Bangla", "Switch to English"),
    );
    el("recipient-name").textContent = ready
      ? recipient
      : say("Awaiting committee details", "কমিটির তথ্যের অপেক্ষায়");
    el("upi-id").textContent = ready
      ? upi
      : say("Not yet configured", "এখনও যুক্ত করা হয়নি");
    el("payment-status").textContent = ready
      ? say(
          "UPI details available. Review the recipient before continuing.",
          "ইউপিআই তথ্য উপলব্ধ। এগোনোর আগে প্রাপকের নাম দেখুন।",
        )
      : say(
          "Online donations are not open yet. To donate, kindly contact on the number 9382482377.",
          "অনলাইন অনুদান এখনও চালু হয়নি। দান করতে অনুগ্রহ করে ৯৩৮২৪৮২৩৭৭ নম্বরে যোগাযোগ করুন।।",
        );
    motion();
  }
  el("pay-button").disabled = !ready;
  el("copy-upi").disabled = !ready;
  el("amount").disabled = !ready;
  document.querySelectorAll("[data-amount]").forEach((b) => {
    b.disabled = !ready;
    b.onclick = () => {
      el("amount").value = b.dataset.amount;
      document
        .querySelectorAll("[data-amount]")
        .forEach((x) => x.classList.toggle("selected", x === b));
    };
  });
  el("donation-form").onsubmit = (e) => {
    e.preventDefault();
    if (!ready) return;
    const a = Number(el("amount").value);
    if (
      !Number.isFinite(a) ||
      a < 1 ||
      a > 100000 ||
      !el("donation-form").reportValidity()
    )
      return;
    const params = new URLSearchParams({
      pa: upi,
      pn: recipient,
      am: a.toFixed(2),
      cu: "INR",
      tn: String(config.note || "Kanakpur Shyama Puja donation"),
    });
    window.location.href = "upi://pay?" + params.toString();
    el("payment-status").textContent = say(
      "Complete the payment in your UPI app. If no app opened, copy the UPI ID and pay from your preferred app.",
      "ইউপিআই অ্যাপে পেমেন্ট সম্পন্ন করুন। অ্যাপ না খুললে আইডি কপি করে আপনার পছন্দের অ্যাপ ব্যবহার করুন।",
    );
  };
  el("copy-upi").onclick = async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(upi);
      el("payment-status").textContent = say(
        "UPI ID copied.",
        "ইউপিআই আইডি কপি হয়েছে।",
      );
    } catch {
      el("payment-status").textContent = say(
        "Select and copy the UPI ID displayed above.",
        "উপরের ইউপিআই আইডিটি নির্বাচন করে কপি করুন।",
      );
    }
  };
  const qr = String(config.qrImage || "");
  if (ready && /^assets\/[a-zA-Z0-9_./-]+$/.test(qr)) {
    el("payment-qr").src = qr;
    el("qr-wrap").hidden = false;
    el("payment-qr").onerror = () => {
      el("qr-wrap").hidden = true;
    };
  }
  el("language").onclick = () => {
    lang = lang === "en" ? "bn" : "en";
    try {
      localStorage.setItem("kanakpur-language", lang);
    } catch {}
    translate();
  };
  el("motion").onclick = () => {
    paused = !paused;
    motion();
  };
  translate();
})();
