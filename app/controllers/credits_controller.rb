class CreditsController < ApplicationController

  def create
    @credit = Credit.new(credit_params)
    if @credit.save
        render json: @credit, status: 201, notice:"You have successfully voted for this article!"
    else
        render json: @credit, status: 201, notice: "You have already credited this article!"
    end
  end

  private

    def credit_params
      params.require(:credit).permit(
      :vote,
      :article_id,
      :user_id
      )
    end
end
