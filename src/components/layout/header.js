import HeaderCartButton from './header-cart-button';
import mealsImage from '../../assets/meals.jpg';
import classes from './header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Claus' Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table with delicious food!' />
      </div>
    </>
  );
};

export default Header;