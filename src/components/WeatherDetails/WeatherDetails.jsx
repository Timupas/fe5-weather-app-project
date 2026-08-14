import styles from "./WeatherDetails.module.css";
import { WiThermometer, WiWindy } from "react-icons/wi";
import { FaCloudRain, FaRegEye } from "react-icons/fa";
import { IoMdSpeedometer } from "react-icons/io";

export const WeatherDetails = ({ weather }) => {
  const feelsLike = Math.round(weather.main.feels_like);
  const minTemp = Math.round(weather.main.temp_min);
  const maxTemp = Math.round(weather.main.temp_max);
  const humidity = weather.main.humidity;
  const pressure = weather.main.pressure;
  const windSpeed = weather.wind.speed;
  const visibility =
    weather.visibility >= 10000 ? "Unlimited" : `${weather.visibility} m`;

  const details = [
    {
      id: 1,
      title: "Feels like",
      value: `${feelsLike}°C`,
      icon: <WiThermometer className={styles.icon} />,
    },
    {
      id: 2,
      title: "Min °C",
      value: `${minTemp}°C`,
      maxTempTitle: "Max °C",
      maxTempValue: `${maxTemp}°C`,
      icon: null,
    },
    {
      id: 3,
      title: "Humidity",
      value: `${humidity}%`,
      icon: <FaCloudRain className={styles.icon} />,
    },
    {
      id: 4,
      title: "Pressure",
      value: `${pressure} Pa`,
      icon: <IoMdSpeedometer className={styles.icon} />,
    },
    {
      id: 5,
      title: "Wind speed",
      value: `${windSpeed} m/s`,
      icon: <WiWindy className={styles.icon} />,
    },
    {
      id: 6,
      title: "Visibility",
      value: visibility,
      icon: <FaRegEye className={styles.icon} />,
    },
  ];

  return (
    <div className={styles.details}>
      <ul className={styles.list}>
        {details.map((item) => (
          <li className={styles.card} key={item.id}>
            <p className={styles.title}>{item.title}</p>
            <p className={styles.value}>{item.value}</p>

            {item.maxTempTitle && (
              <>
                <p className={styles.title}>{item.maxTempTitle}</p>
                <p className={styles.value}>{item.maxTempValue}</p>
              </>
            )}

            {item.icon && item.icon}
          </li>
        ))}
      </ul>
    </div>
  );
};
