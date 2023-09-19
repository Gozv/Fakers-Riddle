import githubLogo from '../assets/img/logo-github.svg'
import linkedinLogo from '../assets/img/linkedin.svg'
import './Footer.modules.css'

function Footer () {
  return(
    <>
        <h1>About Us</h1>

        <section className="members">
          <div className="member">
            <p>Gonzalo Vignolles</p>
            <div className="images">
              <a href="https://github.com/Gozv">
                <img src={githubLogo} alt="githubLogo"/>
              </a>
              <a href="">
                <img src={linkedinLogo} alt="githubLogo"/>
              </a>
            </div>
          </div>

          <div className="member">
            <p>Anahi Flores</p>
            <div className="images">
              <a href="">
                <img src={githubLogo} alt="githubLogo"/>
              </a>
              <a href="">
                <img src={linkedinLogo} alt="githubLogo"/>
              </a>
            </div>
          </div>

          <div className="member">
            <p>Antonela Ledesma</p>
            <div className="images">
              <a href="https://github.com/AntonelaLedesma7">
                <img src={githubLogo} alt="githubLogo"/>
              </a>
              <a href="">
                <img src={linkedinLogo} alt="githubLogo"/>
              </a>
            </div>
          </div>

          <div className="member">
            <p>Martina Vargas</p>
            <div className="images">
              <a href="https://github.com/martinavargas">
                <img src={githubLogo} alt="githubLogo"/>
              </a>
              <a href="">
                <img src={linkedinLogo} alt="githubLogo"/>
              </a>
            </div>
          </div>
        </section>
    </>
  )
}

export default Footer