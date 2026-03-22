/**
 * Mobile Menu Button Component
 */

interface MobileMenuButtonProps {
  onClick: () => void;
}

export function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden p-2 text-navy-custom dark:text-white"
      aria-label="Open menu"
    >
      <span className="material-symbols-outlined text-2xl!">menu</span>
    </button>
  );
}
