import './style.scss';

interface IProps {
	leftContent: React.ReactNode;
	rightContent: React.ReactNode;
}

export default function AuthLayout(props: IProps) {
	return <div className="auth-layout">
        <div className='container'>
            <div className='left-content'>
                {props.leftContent}
            </div>
            <div className='right-content'>
                {props.rightContent}
            </div>
        </div>
    </div>;
}
