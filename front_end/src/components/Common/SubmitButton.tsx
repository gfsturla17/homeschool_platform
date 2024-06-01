import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.confirm};
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.colors.confirm}CC; // Use a darker shade of the confirm color for hover
    }
`;

const SubmitButton: React.FC<Props> = ({ children, onClick, type = 'submit' }) => {
  return (
    <Button onClick={onClick} type={type}>
      {children}
    </Button>
  );
};

export default SubmitButton;