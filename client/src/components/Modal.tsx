import { CSSProperties, FC, FormEventHandler, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  className?: string;
  style?: CSSProperties;
  header?: string;
  headerClass?: string;
  onSubmit?: FormEventHandler;
  contentClass?: string;
  footer?: string;
  footerClass?: string;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({
  className,
  style,
  header,
  headerClass,
  onSubmit,
  contentClass,
  footer,
  footerClass,
  children,
}) => {
  const content = (
    <div className={className ? `modal ${className}` : 'modal'} style={style}>
      <header className={headerClass ? `modal__header ${headerClass}` : 'modal__header'}>
        <h3>{header}</h3>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={contentClass ? `modal__content ${contentClass}` : 'modal__content'}>
          {children}
        </div>
        <footer className={footerClass ? `modal__footer ${footerClass}` : 'modal__footer'}>
          {footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook') as HTMLElement);
};

export default Modal;
