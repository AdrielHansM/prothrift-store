import '../../assets/styles/FirstFeat.css';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function FirstFeat() {
    return(
        <>
        <body className='feat1'>
            <div className="feattext">
                <p className="feattext1">What you potentially saved</p>
                    <div className="potential">
                        <p>*****</p>
                    </div>
                    <br/><br/>
                    <p className="feattext1">Total of Users saved a Potential</p>
                        <div className="numofpounds">
                            <p># of Pounds</p>
                        </div>
                    <p className="feattext1">By Doing Secondhand Shopping</p>
            </div>
            <Link to={'/secfeat'}><Button className="featBtn">Start Thrifting</Button></Link>
        </body>
        </>
    )
}