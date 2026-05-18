export interface BubbleProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  id: string;
  bgColor: string;
}

const Bubble: React.FC<BubbleProps> = ({ onClick, id, bgColor }) => {
  return <div role='button' style={{ backgroundColor: bgColor }} onClick={onClick} id={id} className={'bubble'} />;
};

export default Bubble;
