export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNok(amount: number) {
  return `${new Intl.NumberFormat("nb-NO").format(amount)} kr`;
}

export function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 8) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
  }
  return phone;
}

export function telHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+47${digits}`;
}
