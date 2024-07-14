import styles from "./page.module.css";
import Slider from "./components/Slider/Slider";

export default function Home() {
  return(<div id={styles.container}>
        <Slider></Slider>
    </div>
  );
}
