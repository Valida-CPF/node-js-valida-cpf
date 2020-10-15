# node-js-valida-cpf
Sistema backend para aplicação Valida CPF. Para o funcionamento de toda a aplicação, veja também o [Sistema Frontend em React](https://github.com/Valida-CPF/react-js-valida-cpf)

## Intro
**Esta aplicação deve ser executada localmente por ainda não ter nenhum deploy.**

O sistema backend da aplicação foi desenvolvido em NodeJs com TypeScript. O sistema processa as requisições feitas pelo sistema frontend, fazendo o upload e download 
dos arquivos .xlsx assim como sua análise. O sistema gerencia as rotas chamadas pelo sistema frontend e realiza o processamento necessário para cada uma delas.

## Módulos utilizados
Para o processamento dos arquivos os seguintes módulos NPM foram utilizados:
* XLSX
* Multer
* Move-File

#### XLSX
O módulo XLSX foi utilizado para facilitar a manipulação dos arquivos .xlsx, permitindo que o sistema os leia e o transforme em JSON, para assim enviar as informações prontas
para às mostrar na tela do sistema frontend.

#### Multer
O módulo Multer foi utilizado para facilitar o Upload do arquivo Excel. O sistema backend envia o arquivo Excel, que deve ser armazenando temporariamente para a análise dos dados.

#### Move-File
O módulo Move-File foi utilizado para mover o arquivo processado para a pasta ./downloads por conta de uma limitação na escrita de arquivos com o módulo XLSX, que não permite
informar o destino do arquivo.

## Rodar Aplicação
Por ainda não estar disponibilizada em um servidor alguns passos devem ser executados para que a aplicação rode com sucesso localmente.

#### 1. Git clone
```
git init
git clone https://github.com/Valida-CPF/node-js-valida-cpf.git
```

#### 2. Limpar cache
```
npm cache clean --force
```

#### 3. Excluir arquivos
Delete o arquivo **package-lock.json** e a pasta **node_modules**

#### 4. Instalar NPM
```
npm install
```

#### 5. Rodar a aplicação
```
npm run dev
```
