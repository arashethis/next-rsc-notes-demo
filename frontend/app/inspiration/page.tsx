import FancyText from 'components/inspiration/FancyText';
import InspirationGenerator from 'components/inspiration/InspirationGenerator';
import Copyright from 'components/inspiration/Copyright';

export default function App() {
  return (
    <>
      <FancyText title text="Get Inspired App" />
      <InspirationGenerator>
        <Copyright year={2004} />
      </InspirationGenerator>
    </>
  );
}

