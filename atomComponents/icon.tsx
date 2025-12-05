export const SideBar = ({
  navOpen,
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  navOpen: boolean;
  label: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={` h-10 w-full flex flex-row gap-2 text-sm items-center cursor-pointer p-1 hover:bg-neutral-800/60 hover:shadow-[0px_0px_5px_#808080] ${
        navOpen ? "justify-start" : "justify-center"
      }`}
      onClick={onClick}
    >
      {icon}
      {navOpen && <span>{label}</span>}
    </div>
  );
};
