Rails.application.routes.draw do
  get 'inicial' => 'home#index'
  root 'home#index'

  resources :phones
  resources :addresses
  resources :contacts #, only: [:show, :destroy]
  resources :kinds
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
