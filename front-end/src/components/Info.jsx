import githubLogo from '../assets/img/logo-github.svg'
import linkedinLogo from '../assets/img/linkedin.svg'

function Info() {
  return (
    <>
      <h2 className="p-6 font-serif font-bold text-center text-xl">About Us</h2>

      <section className="grid grid-cols-4">
        <div className="p-4 inline-block">
          <h3>Gonzalo Vignolles</h3>
          <div className="flex items-center">
            <div className="w-24 rounded">
              <a href="https://github.com/Gozv">
                <img src={githubLogo} alt="githubLogo" />
              </a>
            </div>
            <div className="w-24 rounded-xl">
              <a href="">
                <img src={linkedinLogo} alt="githubLogo" />
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 inline-block">
          <h3>Anahí Flores</h3>
          <div className='flex items-center'>
            <div className="w-24 rounded-full">
              <a href="">
                <img src={githubLogo} alt="githubLogo" />
              </a>
            </div>
            <div className="w-24 rounded-xl">
              <a href="">
                <img src={linkedinLogo} alt="githubLogo" />
              </a>
            </div>
          </div>

        </div>
        <div className="p-4 inline-block">
          <h3>Antonela Ledesma</h3>
          <div className='flex items-center'>
            <div className="w-24 rounded-full">
              <a href="https://github.com/AntonelaLedesma7">
                <img src={githubLogo} alt="githubLogo" />
              </a>
            </div>
            <div className="w-24 rounded-xl">
              <a href="">
                <img src={linkedinLogo} alt="githubLogo" />
              </a>
            </div>
          </div>
        </div>
        <div className="p-4 inline-block">
          <h3>Martina Vargas</h3>
          <div className='flex items-center'>
            <div className="w-24 rounded-full">
              <a href="https://github.com/martinavargas">
                <img src={githubLogo} alt="githubLogo" />
              </a>
            </div>
            <div className="w-24 rounded-xl">
              <a href="">
                <img src={linkedinLogo} alt="githubLogo" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

export default Info