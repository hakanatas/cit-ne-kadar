/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 7. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Kenarlar x ve x + 3', en: 'Sides x and x + 3',
      note: 'Dikdörtgen bir bahçenin kısa kenarı x metre, uzun kenarı x artı 3 metre. Çevresine çit çekilecek. Kaç metre tel gerekir?' },
    { scene: 2, start: 10.8, end: 20.6, tr: '(x + 3) + x + (x + 3) + x', en: '(x + 3) + x + (x + 3) + x',
      note: 'Dört kenarı toplayalım. Cebir karolarıyla gösterelim: x çubukları ve birim kareler. Değişme ve birleşme özellikleriyle x’leri bir araya, sayıları bir araya toplarız.' },
    { scene: 2, start: 21.0, end: 27.8, tr: 'Çevre = 4x + 6', en: 'Perimeter = 4x + 6',
      note: 'Dört x ve altı birim: çevre 4x artı 6 metre.' },
    { scene: 3, start: 28.6, end: 36.8, tr: '2 · (4x + 6) = 8x + 12', en: '2 · (4x + 6) = 8x + 12',
      note: 'Aynı bahçeden iki tane olursa çit 2 katına çıkar. Dağılma özelliği: 2 hem 4x’i hem 6’yı çarpar, 8x artı 12. x 5 iken ikisi de 52 verir: denk ifadeler.' },
    { scene: 3, start: 37.2, end: 45.8, tr: '½ · (4x + 6) = 2x + 3', en: '½ · (4x + 6) = 2x + 3',
      note: 'Çitin yarısı: 1 bölü 2 ile çarpalım. 1 bölü 2 çarpı 4x, 2x; 1 bölü 2 çarpı 6, 3. Yarım çit 2x artı 3. Denk ifadeler her x için aynı sonucu verir.' },
    { scene: 4, start: 46.6, end: 57.0, tr: '(6x + 2) − (4x + 6) = 2x − 4', en: '(6x + 2) − (4x + 6) = 2x − 4',
      note: 'Kapı için 1,5 metre boşluk bırakılırsa 4x artı 6 eksi 1,5, yani 4x artı 4,5. Ece’nin çiti 6x artı 2, Can’ınki 4x artı 6 metre. Farkı bulurken parantezin önündeki eksi her terimin işaretini değiştirir.' },
    { scene: 4, start: 57.4, end: 63.8, tr: 'İşaretlere dikkat', en: 'Watch the signs',
      note: '6x eksi 4x, 2x; 2 eksi 6, eksi 4. Fark 2x eksi 4 metre.' },
    { scene: 5, start: 64.6, end: 74.6, tr: 'x = 1, 2, 3 için karşılaştır', en: 'Compare for x = 1, 2, 3',
      note: 'x yerine 1, 2, 3 koyalım. İlk üç ifade her seferinde aynı: 10, 14, 18. 10x ise x 1 iken 10 veriyor ama x 2 iken 20: tutmuyor.' },
    { scene: 5, start: 75.0, end: 79.8, tr: '4x + 6 ile 10x denk değil', en: '4x + 6 and 10x are not equivalent',
      note: 'Tek örnek yetmez: denk ifadeler her x için eşit olmalı. 4x artı 6 ile 10x denk değil.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Benzer terimler, dağılma, işaretler', en: 'Like terms, distributing, signs',
      note: 'Aklında kalsın: benzer terimleri topla; çarparken dağılma özelliğini kullan; çıkarırken eksi parantezdeki her terime dağılır.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Denk ifadeler her x için eşit!', en: 'Equivalent expressions agree for every x!',
      note: 'Denk ifadeler her x için aynı değeri verir!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
