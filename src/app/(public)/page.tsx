import {Fragment} from 'react'
import styles from "./page.module.css";
import Home from "@/ui/Home";

export default function Page() {
    return (
        <Fragment>
           <Home styles={styles}/>
        </Fragment>
    )
}