# monolith-api

# Get Start

Step 1. Clone from `git`
Step 2. Install `nodejs` (verssion 10.18.1 ).
Step 3. Move to folder and run command: `npm install`
Step 4. create file `.env`
Step 5. Copy config from `.env.example` to `.env`
Step 6. Create database and config in `.env`
Step 7. Run command `npm run migrate` to create table

### Run dev watch

Run command : `npm run dev-ts`
* That run with ts-node

### Build dev and run watch

Run command : `npm run dev`

* That build typescript to javascript and watch the file change => suggest use it


### Run debug

Run command : `npm run dev:debug`


### Build prod

Run command : `npm run build`


### Document


### Description :

Cấu trúc:
+ router => controller => service => model => entity.

### Router:
Sử dụng để gán middleware , check authen, assign controller , và viết swagger gen http request :https://swagger.io/docs/ 
=> lưu ý : tất cả api đều phải được viết swagger chi tiết miêu tả url, token, input params , response example , error

### Controller :
Sử dụng để verify input params (sử dụng happy join để verify), sau đó gọi tới đúng service cần thiết

### Service :
Nhận yêu cầu từ controller , khởi tạo transaction (transaction của mysql nếu có). truyền các transaction này tới các model , 1 service có thể gọi tới nhiều model khác nhau , vd như :  user service, có thể gọi tới  User model,  Profile model .v.v.v để thực hiện đầy đủ nghiệp vụ

### Model :
Nhận transaction từ service , gọi tới entity và thực hiện thao tác với database , mỗi model có thể get từ nhiều Entity , nhưng chỉ được phép thay đổi entity tương ứng của chính model đó . 
Vd:
User model , có thể get data từ User Entity và Profile Entity , tuy nhiên không được create , update , delete data thuộc Profile Entity , mà chỉ được C,U,D trên User Entity (Việc thực hiện các tác vụ này phải được thực hiện trên service)

### Entity : 
Chi tiết xem tại
https://typeorm.io/#/


## Database
### Migration :
mọi thao tác với các bảng của database phải được khởi tạo từ migration , không được set cứng trong database test, role trên nhằm đồng bộ hóa tất cả database của các dev member qua code, khi được dev push code lên git , các member khác trong team chỉ cần pull về `npm run migrate` sẽ đồng bộ được toàn bộ db. 






