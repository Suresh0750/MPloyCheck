  



# Features

 * User 
    - Signup
    - Login
    - Records 
 * Admin 
    - login 
    - records (CRUD)
      - Create
      - Read (Delay API call)
      - Update
      - Delete
    - User (CRUD)
      - Create
      - Read
      - Update 
      - Delete




# Architecture

* Application Layer
   - busness logic
   - dto (Data Transfer Object)
   - Service - (contains bussiness logic)
     - JWT 
* Domain Layer
   - enities (types of data's) 
   - interface
   - models (Schma models types)
* infrastructure
   - database 
     - models (contains Schma)
     - repositories (contains database query - lower level module)
   - Service (contains external service)
     - Bcrypt
* presentation
   - Handle http request response.
  
* shared  
   - contain common data which is use across all aplication 
   - HttpStatuscode. 