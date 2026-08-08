const ImageCard = () => {
  return (
    <div className="w-48 h-58 rounded-2xl overflow-hidden shadow-lg border border-outline-variant/10 bg-surface-container backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5">
      {/* Header with bigger top border */}
      <div className="w-full h-full flex flex-col bg-surface-container-high">
        {/* Top border - thick with terminal dots */}
        <div className="w-full h-8 p-3 bg-surface-container flex items-center px-3 border-b border-outline-variant/10 gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[8px] text-on-surface-variant/40 uppercase tracking-widest ml-2">
            image.png
          </span>
        </div>

        {/* Image container with thinner borders */}
        <div className="flex-1 flex items-center justify-center  border-x border-outline-variant/5 border-b border-outline-variant/5">
          <div className="w-full h-full flex items-center justify-center rounded-b-xl overflow-hidden bg-surface-container/50">
            <img
              src="/avatar_2.jpeg"
              alt="About Me"
              className="w-full h-full object-cover rounded-b-xl transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ImageCard;