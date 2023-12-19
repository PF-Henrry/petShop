"use client";

export default function ToTopBtnFooter() {
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <button className="backToTop-btn" onClick={backToTop}>
        Inicio de p&aacute;gina
      </button>
    </div>
  );
}
