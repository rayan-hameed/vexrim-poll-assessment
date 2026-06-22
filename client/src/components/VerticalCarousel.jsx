/**
 * VerticalCarousel
 * ------------------
 * A from-scratch carousel (no swiper/react-slick/etc). It stacks every
 * slide in a column and translates the track vertically so that only the
 * slide at `activeIndex` is visible — sliding up when moving forward and
 * down when moving backward. Each slide keeps its own DOM node mounted,
 * so per-slide animations (hover labels, selection state) are untouched
 * by the transition.
 */
export default function VerticalCarousel({ activeIndex, slides }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
        style={{ transform: `translateY(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.key ?? index} className="h-full w-full shrink-0">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
}
