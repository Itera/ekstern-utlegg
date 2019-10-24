export const tlfregex = /^(\+[0-9]{2} ?)?(([0-9]{3}[ -]?[0-9]{2}[ -]?[0-9]{3})|([0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9]{2}))$/;
export const accountregex = /^([0-9]{4})[. ]?([0-9]{2})[. ]?([0-9]{5})$/;

export const formatAccount = (account?: string) => {
  if (!account) {
    return account;
  }

  if (accountregex.test(account)) {
    const parts = accountregex.exec(account);

    return `${parts![1]}.${parts![2]}.${parts![3]}`;
  } else {
    return account;
  }
};

export const formatTlf = (tlf?: string) => {
  const format = (number: string) => {
    const prefix = number.substring(0, 1);

    let re;

    if (prefix === "4" || prefix === "8" || prefix === "9") {
      re = /([0-9]{3})([0-9]{2})([0-9]{3})/;
    } else {
      re = /([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/;
    }

    const numberParts = re.exec(number);

    return numberParts!.slice(1).join(" ");
  };

  if (!tlf) {
    return tlf;
  }

  if (tlfregex.test(tlf)) {
    const parts = tlfregex.exec(tlf);

    let land = parts![1];
    let number = parts![2];

    if (!land) {
      land = "+47";
    }

    land = land.replace(/ /g, "");
    number = number.replace(/ /g, "");

    return `${land} ${format(number)}`;
  } else {
    return tlf;
  }
};
