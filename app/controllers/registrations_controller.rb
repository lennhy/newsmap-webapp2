class RegistrationsController < Devise::RegistrationsController

  # sanatize your params
  private

    # these devise methods tells the devise gem to persist the information from the custom fields into the database
    def sign_up_params
      params.require(:user).permit(
        :name,
        :email,
        :password,
        :role
      )
    end

    def account_update_params
      params.require(:user).permit(
        :name,
        :email,
        :password,
        :role
      )
    end

end
