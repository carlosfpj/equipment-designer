import styles from "../assets/styles/asideButton/styles.module.css"

interface AsideButtonProps {
  className?: string,
  children?: string
}

const AsideButton = ({className, children}: AsideButtonProps) => {
  return(
    <button className={styles.button}>{children}</button>
  )
}

export default AsideButton;