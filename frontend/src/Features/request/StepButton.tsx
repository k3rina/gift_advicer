function StepButton({
  onClick,
  label,
}: {
  label: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button className="buttons blob-btn" onClick={onClick} type="button">
      {label}
    </button>
  );
}
export default StepButton;
