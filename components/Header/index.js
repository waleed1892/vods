import React, {useState} from 'react'
// import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';


import {
    Layout,
    LogoSearch,
    LogoSection,
    MobileHeader,
    MobileMenuBtn,
    SearchButton,
    SearchInput,
    StyledDiv,
    StyledSearch,
    StyledSearchIcon,
    StyledUl
} from "./style";
// import { useHistory } from "react-router-dom";
import {useRouter} from 'next/router'
import Logo from '../../assets/vods-logo.png'
import Link from 'next/link'


const Header = () => {
    const router = useRouter()
    const [openMenu, setOpenMenu] = useState(false)
    const [sidebarMargin, setSidebarmargin] = useState("-150px")
    const [searchVal, setSearchVal] = useState('')


    const sidebarDisplay = (menu, margin) => {
        setOpenMenu(menu)
        setSidebarmargin(margin)
    }

    const searchNavigate = (evt) => {
        if (evt.key === "Enter") {
            router.push(`/search?q=${searchVal}`)
            setSearchVal('')
        }
    }

    const navigation = (url) => {
        setOpenMenu(false)
        setSidebarmargin("-150px")
        router.push(url)
    }

    return (
        <>
            <StyledDiv>
                <LogoSearch>
                    <LogoSection>
                        <Link href="/">
                            <a href="/">
                                <img src={Logo} alt="Logo" className="w-100"/>
                            </a>
                        </Link>
                    </LogoSection>
                    <StyledUl>
                        <li><Link href={'/'}><a className="nav-link" href="/">Trending</a></Link></li>
                        <li><Link href={'/most-viewed'}><a className="nav-link" href="/most-viewed">Most
                            Viewed</a></Link>
                        </li>
                        <li><Link href={'/longest'}><a className="nav-link"
                                                       href="/longest">Longest</a></Link></li>
                    </StyledUl>
                </LogoSearch>
                <div className="d-flex align-items-center">
                    <StyledSearch>
                        <SearchInput
                            placeholder="Search streamers, games..."
                            inputProps={{'aria-label': 'search'}}
                            value={searchVal}
                            onChange={(evt) => setSearchVal(evt.target.value)}
                            onKeyDown={searchNavigate}
                        />
                    </StyledSearch>
                    <StyledSearchIcon onClick={() => history.push(`/twitch/search?q=${searchVal}`)}>
                        <SearchButton>
                            <SearchIcon/>
                        </SearchButton>
                    </StyledSearchIcon>
                </div>
                <StyledUl>
                    <li><Link href={'/streamers'}><a className="nav-link" href="/streamers">Streamers</a></Link>
                    </li>
                    <li><Link href={'/games'}><a className="nav-link" href="/games">Games</a></Link></li>
                    <li><Link href={'/about'}><a className="nav-link" href="/about">About Us</a></Link>
                    </li>
                </StyledUl>
                <MobileMenuBtn onClick={() => sidebarDisplay(!openMenu, '0px')}>
                    {
                        openMenu ? <ClearRoundedIcon style={{color: "white"}}/> :
                            <MenuRoundedIcon style={{color: "white"}}/>
                    }

                </MobileMenuBtn>
            </StyledDiv>
            <MobileHeader style={{marginLeft: sidebarMargin}}>
                <div className="d-flex justify-content-end">
                    <SearchButton onClick={() => sidebarDisplay(!openMenu, '-150px')}>
                        <ClearRoundedIcon style={{color: "white"}}/>
                    </SearchButton>
                </div>
                <li onClick={() => navigation('/')}><a href="/" className="nav-link">Trending</a></li>
                <li onClick={() => navigation('/most-viewed')}><a href="/most-viewed" className="nav-link">Most
                    Viewed</a>
                </li>
                <li onClick={() => navigation('/longest')}><a href="/longest"
                                                              className="nav-link">Longest</a></li>
                <li onClick={() => navigation('/streamers')}><a href="/streamers"
                                                                className="nav-link">Streamers</a></li>
                <li onClick={() => navigation('/games')}><a href="/games" className="nav-link">Games</a>
                </li>
                <li onClick={() => navigation('/about')}><a href="/about" className="nav-link">About
                    Us</a></li>
            </MobileHeader>
            {
                openMenu ?
                    <Layout onClick={() => sidebarDisplay(false, '-150px')}/>
                    : ''
            }
        </>
    )
}

export default Header