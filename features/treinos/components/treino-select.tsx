import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onEventChange: (...event: any[]) => void;
  data: string[];
  selectLabel: string;
};

export function TreinoSelect({ onEventChange, data, selectLabel }: Props) {
  return (
    <Select onValueChange={onEventChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={data.at(0)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>
          {data.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
