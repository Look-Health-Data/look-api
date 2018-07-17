// TODO: Create this from a spreadsheet. There is some existing project.
export default `mutation {
    u1: CreateUser(
      id: "u1", 
      username: "joeflack4"
      password: "password"
      nickname: "Joey"
      person_name_first: "Joe"
      person_name_last: "Flack"
      person_name_middle: "Eugene"
      person_name_suffix: "IV"
      person_name_prefix: "Mr."
      person_dob: "1984-03-15"
      contact_address_street: "704 N Madeira St"
      contact_address_city: "Baltimore"
      contact_address_state: "MD"
      contact_address_zip: "21205"
      contact_address_country: "USA"
      contact_emails: ["joeflack4@gmail.com"]
      contact_phones: ["850-982-7871"]
      # contacts(first: Int = 10, offset: Int = 0): [User] @relation(name: "PERSONAL_CONTACT", direction: "BOTH")
    ) {
      id
      username
      nickname
    }

    u1: CreateUser(
      id: "u1", 
      username: "elizabeth.ashley.flack"
      password: "password"
      nickname: "Ashley"
      person_name_first: "Elizabeth"
      person_name_last: "Flack"
      person_name_middle: "Ashley"
      person_name_suffix: ""
      person_name_prefix: "Mrs."
      person_dob: "1987-04-30"
      contact_address_street: "704 N Madeira St"
      contact_address_city: "Baltimore"
      contact_address_state: "MD"
      contact_address_zip: "21205"
      contact_address_country: "USA"
      contact_emails: ["elizabeth.ashley.flack@gmail.com"]
      contact_phones: ["443-995-2396"]
      # contacts(first: Int = 10, offset: Int = 0): [User] @relation(name: "PERSONAL_CONTACT", direction: "BOTH")
    ) {
      id
      username
      nickname
    }

    u1: CreateUser(
      id: "u1", 
      username: "neomi.caban"
      password: "password"
      nickname: "Neomi"
      person_name_first: "Neomi"
      person_name_last: "Caban"
      person_name_middle: ""
      person_name_suffix: ""
      person_name_prefix: "Ms."
      person_dob: "1954-10-28"
      contact_address_street: "1744 Cedrus Lane?"
      contact_address_city: "Pensacola"
      contact_address_state: "FL"
      contact_address_zip: "32514"
      contact_address_country: "USA"
      contact_emails: ["cranberrypinkx2@gmail.com"]
      contact_phones: ["850-982-7795"]
      # contacts(first: Int = 10, offset: Int = 0): [User] @relation(name: "PERSONAL_CONTACT", direction: "BOTH")
    ) {
      id
      username
      nickname
    }
    
    # c1:CreateCategory(name:"Coffee"){name}
    
    # a1: AddBusinessCategory(businessid: "b1", categoryname:"Beer"){id}
    # a1a:AddBusinessCategory(businessid: "b1", categoryname:"Brewery"){id}
    
    # r1:CreateReview(id:"r1", stars: 4, text: "Great IPA selection!"){id}
    # ar1:AddUserReview(userid:"u1",reviewid:"r1"){id}
    # ab1:AddReviewBusiness(reviewid:"r1", businessid:"b1"){id} 
  }
`  