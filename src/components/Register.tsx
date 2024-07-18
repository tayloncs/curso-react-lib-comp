import {
  ButtonSka,
  CardSka,
  DatePickerSka,
  DividerSka,
  FormSka,
  InputNumberSka,
  InputPasswordSka,
  InputSka,
  StackSka,
  ToggleSka,
} from "ska-studio-components";
interface Props {
  setUser: Function;
}
export const Register = ({ setUser }: Props) => {
  function onFinish(event: any) {
    console.log("event :", event);
    setUser(event);
  }

  return (
    <StackSka alignItems="center" margin={"auto"}>
      <CardSka title={"Cadastro Treinador"} bordered style={{ width: 500 }}>
        <FormSka
          name="register"
          onFinish={onFinish}
          autoComplete="off"
          labelAlign="left"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 25 }}
          initialValues={{ age: 15 }}
        >
          <FormSka.Item
            label={"Nome"}
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <InputSka placeholder="Ashe" />
          </FormSka.Item>

          <FormSka.Item
            label={"Idade"}
            name="age"
            rules={[{ required: true, message: "Please input your age!" }]}
          >
            <InputNumberSka max={99} min={10} style={{ width: "100%" }} />
          </FormSka.Item>

          <FormSka.Item
            label={"Nascimento"}
            name="date"
            rules={[{ required: true, message: "Please input your date!" }]}
          >
            <DatePickerSka style={{ width: "100%" }} />
          </FormSka.Item>

          <FormSka.Item
            label={"Senha"}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <InputPasswordSka onChange={undefined} />
          </FormSka.Item>

          <FormSka.Item label="Humano" name="isHuman">
            <ToggleSka onChange={() => ""} textUnChecked="não" textChecked="sim" />
          </FormSka.Item>

          <DividerSka />
          <StackSka row justifyContent="flex-end" gap={20}>
            <FormSka.Item>
              <ButtonSka htmlType="submit">Salvar</ButtonSka>
            </FormSka.Item>
            <FormSka.Item>
              <StackSka alignItems="flex-end">
                <ButtonSka variant="secondary" htmlType="reset">
                  Limpar
                </ButtonSka>
              </StackSka>
            </FormSka.Item>
          </StackSka>
        </FormSka>
      </CardSka>
    </StackSka>
  );
};
