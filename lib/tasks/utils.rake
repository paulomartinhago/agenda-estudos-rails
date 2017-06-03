namespace :utils do

  desc "Popular banco de dados."
  task seed: :environment do
    puts "Criando os contatos [Contacts]..."
      100.times do |i|
        Contact.create!(
          name: Faker::Name.name,
          email: Faker::Internet.email,
          kind:Kind.all.sample,
          rmk: LeroleroGenerator.sentence
        )
      end
    puts "Criando os contatos [Contacts]... [ok]"

    puts "Criando os endereços [Addresses]..."
      Contact.all.each do |contact|
        Address.create!(
          street: Faker::Address.street_address,
          city: Faker::Address.city,
          state: Faker::Address.state_abbr,
          contact: contact
        )
      end
    puts "Criando os endereços [Addresses]... [ok]"

    puts "Criando os telefones [Phones]..."
      Contact.all.each do |contact|
        Random.rand(1..5).times do |i|
          Phone.create!(
            phone: Faker::PhoneNumber.phone_number,
            contact: contact
          )
        end
      end
    puts "Criando os telefones [Phones]... [ok]"
  end

end