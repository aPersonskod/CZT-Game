import {NavLink} from "react-router";
import SettingsModal from "./SettingsModal.jsx";
import ChangeDataModal from "./ChangeDataModal.jsx";
import HamburgerMenu from "./HamburgerMenu.jsx";
import AppService from "../services/AppService.js";
import {useMediaQuery} from "react-responsive";

export const appService = new AppService();

function Header() {

    const isTabletOrMobile = useMediaQuery({query: '(max-width: 991px)'});
    const isBigScreen = useMediaQuery({query: '(min-width: 1406px)'});
    return (
        <>
            <div className='sectionBox d-flex justify-content-between' style={{marginLeft:'12px', marginRight:'12px'}}>
                <div className='logo'>ЦЗТ Игра</div>
                {
                    isBigScreen &&
                    <div className='nav-menu d-flex justify-content-around' style={{width: '60vw'}}>
                        {appService.pages.map((p, i) =>
                            <NavLink key={i} to={p.path}
                                     style={({isActive}) => ({
                                         color: isActive ? 'black' : '#797979',
                                         backgroundColor: isActive ? '#F5F7F9' : '',
                                         borderRadius: isActive ? '20px' : ''
                                     })}
                            >{p.header}</NavLink>
                        )}
                    </div>
                }
                <div style={{padding:'0.5rem'}}>
                    {isBigScreen &&
                        <div className='d-flex justify-content-around'>
                            <div style={{marginRight:'10px'}}>
                                <SettingsModal/>
                            </div>
                            <ChangeDataModal/>
                        </div>
                    }
                    {
                        !isBigScreen &&
                        <HamburgerMenu/>
                    }
                </div>
            </div>
        </>
    );
}

export default Header;
