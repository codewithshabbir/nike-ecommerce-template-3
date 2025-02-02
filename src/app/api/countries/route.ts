import { NextResponse } from "next/server";

export async function GET() {
    const countries = [
      { name: 'Afghanistan', code: 'AF', flag: '🇦🇫' },
      { name: 'Albania', code: 'AL', flag: '🇦🇱' },
      { name: 'Algeria', code: 'DZ', flag: '🇩🇿' },
      { name: 'Andorra', code: 'AD', flag: '🇦🇩' },
      { name: 'Angola', code: 'AO', flag: '🇦🇴' },
      { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
      { name: 'Armenia', code: 'AM', flag: '🇦🇲' },
      { name: 'Australia', code: 'AU', flag: '🇦🇺' },
      { name: 'Austria', code: 'AT', flag: '🇦🇹' },
      { name: 'Azerbaijan', code: 'AZ', flag: '🇦🇿' },
      { name: 'Bahrain', code: 'BH', flag: '🇧🇭' },
      { name: 'Bangladesh', code: 'BD', flag: '🇧🇩' },
      { name: 'Belarus', code: 'BY', flag: '🇧🇾' },
      { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
      { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
      { name: 'Canada', code: 'CA', flag: '🇨🇦' },
      { name: 'China', code: 'CN', flag: '🇨🇳' },
      { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
      { name: 'France', code: 'FR', flag: '🇫🇷' },
      { name: 'Germany', code: 'DE', flag: '🇩🇪' },
      { name: 'India', code: 'IN', flag: '🇮🇳' },
      { name: 'Italy', code: 'IT', flag: '🇮🇹' },
      { name: 'Japan', code: 'JP', flag: '🇯🇵' },
      { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
      { name: 'Pakistan', code: 'PK', flag: '🇵🇰' },
      { name: 'Russia', code: 'RU', flag: '🇷🇺' },
      { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
      { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
      { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
      { name: 'Spain', code: 'ES', flag: '🇪🇸' },
      { name: 'Turkey', code: 'TR', flag: '🇹🇷' },
      { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
      { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
      { name: 'United States', code: 'US', flag: '🇺🇸' }
    ];
    return NextResponse.json(countries);
  }