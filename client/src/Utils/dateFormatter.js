/*const shortDayTexts = {
  pazartesi: "Pzt.",
  salı: "Sal.",
  çarşamba: "Çar.",
  perşembe: "Per.",
  cuma: "Cum.",
  cumartesi: "Cmt.",
  pazar: "Paz.",
}; */

export const getTodaysDate = () => {
  const today = new Date();
  return (
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
  );
};

export const formatDate = (date, type) => {
  const today = new Date();
  const day = new Date(date);
  const dd = String(day?.getDate()).padStart(2, "0");
  const mm = String(day?.getMonth() + 1).padStart(2, "0");
  const yyyy = String(day?.getFullYear());
  const MMMM = new Date(date).toLocaleString("tr-TR", { month: "long" });
  const EEEE = new Date(date).toLocaleString("tr-TR", { weekday: "long" });
  const hh = String(day?.getHours()).padStart(2, "0");
  const MM = String(day?.getMinutes()).padStart(2, "0");

  if (type === "newLine") {
    return {
      __html: `${dd}.${mm}.${yyyy} <br /> ${hh}.${MM}`,
    };
  }
  if (type === "noHour") {
    return `${dd}.${mm}.${yyyy}`;
  }

  if (type === "month" || type === "weekday") {
    return new Date(date).toLocaleString("tr-TR", { [type]: "long" });
  }

  if (type === "withHour") {
    return `${dd}.${mm}.${yyyy} ${hh}:${MM}`;
  }

  if (type === "withDashAndHour") {
    return `${dd}.${mm}.${yyyy} - ${hh}:${MM}`;
  }

  if (type === "withDayText") {
    return `${dd} ${MMMM} ${yyyy}, ${EEEE}`;
  }

  if (type === "noYear") {
    return `${dd} ${MMMM}, ${EEEE}`;
  }

  if (type === "withoutDayText") {
    return `${dd} ${MMMM} ${yyyy}`;
  }

  if (type === "withDashNoHour") {
    return `${dd}-${mm}-${yyyy}`;
  }

  if (type === "forDatabase") {
    return `${yyyy}-${mm}-${dd}`;
  }

  if (type === "forDatabaseWithTime") {
    return `${yyyy}-${mm}-${dd} ${hh}:${MM}`;
  }

  if (type === "forDatePicker") {
    return `${yyyy}-${mm}-${dd}T${hh}:${MM}`;
  }

  if (type === "isTodayOrTomorrow") {
    const todayDay = String(today?.getDate()).padStart(2, "0");
    const todayHour = String(today?.getHours()).padStart(2, "0");
    const todayMinutes = String(today?.getMinutes()).padStart(2, "0");
    if ( 
      hh === todayHour &&
      todayMinutes - MM < 1 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "Hemen şimdi";
    }

    if ( 
      hh === todayHour &&
      todayMinutes - MM < 2 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "1 dakika önce";
    }

    if ( 
      hh === todayHour &&
      todayMinutes - MM < 6 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "5 dakika önce";
    }

    if ( 
      hh === todayHour &&
      todayMinutes - MM < 31 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "30 dakika önce";
    }

    if ( 
      todayHour - hh < 2 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "1 saat önce";
    }

    if ( 
      todayHour - hh < 7 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "6 saat önce";
    }

    if ( 
      todayHour - hh < 13 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "12 saat önce";
    }

    if ( 
      todayHour - hh < 19 &&
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "18 saat önce";
    }

    if (
      dd === todayDay &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return `Bugün ${hh}.${MM}`; // Dil dosyasından alıyoruz
    }
    if (
      dd - todayDay === -1 &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "Dün"; // Dil dosyasından alıyoruz
    }
    if (
      dd - todayDay === -2 &&
      day?.getMonth() === today?.getMonth() &&
      day?.getFullYear() === today?.getFullYear()
    ) {
      return "2 gün önce"; // Dil dosyasından alıyoruz
    }
    return `${dd} ${MMMM}, ${EEEE}`;
    //return shortDayTexts[EEEE?.toLocaleLowerCase()]; // Dil dosyasından alıyoruz
  }

  return `${dd}.${mm}.${yyyy} - ${hh}.${MM}`;
};

export const formatDateTarget = (date) => {
  let day = new Date(date);
  const dd = String(day?.getDate()).padStart(2, "0");
  const mm = String(day?.getMonth() + 1).padStart(2, "0");
  const yyyy = String(day?.getFullYear());

  day = `${yyyy}.${mm}.${dd}`;
  return day;
};

export const formatTime = (date) => {
  const time = new Date(date);
  const hours = String(time?.getHours()).padStart(2, "0");
  const minutes = String(time?.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const valueFormatter = (value) => {
  let replacedValue = value;
  if (typeof value !== "string") {
    const parsedValues = parseFloat(value);
    const fixedValue = (+`${Math.round(
      +`${parsedValues}e${2}`
    )}e${-2}`).toFixed(2);
    replacedValue = fixedValue
      .toString()
      .replace(".", ",")
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  return replacedValue;
};